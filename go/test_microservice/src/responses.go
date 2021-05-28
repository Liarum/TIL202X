package mystr

type IsPalResponse struct {
	Message string `json:"message"`
}

type ReverseResponse struct {
	Word string `json:reversed_word"`
}
