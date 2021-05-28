package mystr

import (
	"errors"
	"strings"

	"github.com/go-kit/kit/log"
)

type Service interface {
	IsPal(string) error
	Reverse(string) string
}

type myStringService struct {
	log log.Logger
}

func (svc *myStringService) IsPal(s string) error {
	reverse := svc.Reverse(s)
	if strings.ToLower(s) != reverse {
		return errors.New("Not palindrome")
	}
	return nil
}

func (svc *myStringService) Reverse(s string) string {
	rns := []rune(s)
	for i, j := 0, len(rns)-1; i < j; i, j = i+1, j-1 {
		rns[i], rns[j] = rns[j], rns[i]
	}
	return strings.ToLower(string(rns))
}
