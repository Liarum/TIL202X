package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

/*
Read
*/
func returnAllArticles(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Endpoint Hit: returnAllArticles")
	json.NewEncoder(w).Encode(Articles)
}

func homePage(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "Welcome to the Home.")
	fmt.Println("Endpint Hit : homePage")
}

func returnSingleArticle(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	key := vars["id"]

	// fmt.Fprintf(w, "Key: " + key)

	for _, article := range Articles {
		if article.Id == key {
			json.NewEncoder(w).Encode(article)
		}
	}
}

/*
Create
*/
func createNewArticle(w http.ResponseWriter, r *http.Request) {
	reqBody, _ := ioutil.ReadAll(r.Body)
	// fmt.Fprintf(w, "%+v", string(reqBody))

	var article Article

	json.Unmarshal(reqBody, &article)
	Articles = append(Articles, article)

	json.NewEncoder(w).Encode(article)
}

/*
Router
*/

func handleRequest() {
	// http.HandleFunc("/", homePage)
	// http.HandleFunc("/article", returnAllArticles)

	myRouter := mux.NewRouter().StrictSlash(true)
	myRouter.HandleFunc("/", homePage)
	myRouter.HandleFunc("/articles", returnAllArticles)
	myRouter.HandleFunc("/article/{id}", returnSingleArticle)

	myRouter.HandleFunc("/article", createNewArticle).Methods("POST")

	log.Fatal(http.ListenAndServe(":10000", myRouter))
}

/*
Main
*/
// define Article structure
type Article struct {
	Id      string `json:"Id"`
	Title   string `json:"Title"`
	Desc    string `json:"desc"`
	Content string `json:"content"`
}

var Articles []Article

func main() {
	fmt.Println("Rest API v2.0 - Mux Routers")
	Articles = []Article{
		Article{Id: "1", Title: "Hello", Desc: "Article Description", Content: "Article Sample Content"},
		Article{Id: "2", Title: "World", Desc: "Article Description", Content: "Article Sample content"},
	}

	handleRequest()
}
