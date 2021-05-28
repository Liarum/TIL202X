package mystr

import (
	"context"
	"errors"

	"github.com/go-kit/kit/endpoint"
	"github.com/go-kit/kit/log"
	"github.com/go-kit/kit/log/level"
)

type Endpoints struct {
	GetIsPalindrome endpoint.Endpoint
	GetReverse      endpoint.Endpoint
}

func MakeEndpoints(svc Service, logger log.Logger, middlewares []endpoint.Middleware) Endpoints {
	return Endpoints{
		GetIsPalindrome: wrapEndpoint(makeGetIsPalindromeEndpoint(svc, logger), middlewares),
		GetReverse:      wrapEndpoint(makeGetReverseEndpoint(svc, logger), middlewares),
	}
}

func makeGetIsPalindromeEndpoint(svc Service, logger log.Logger) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		req, ok := request.(*IsPalRequest)
		if !ok {
			level.Error(logger).Log("message", "invalid request")
			return nil, errors.New("invalid request")
		}
		msg := svc.IsPal(ctx, req.Word)
		return &IsPalResponse{
			Message: msg,
		}, nil
	}
}

func makeGetReverseEndpoint(svc Service, logger log.Logger) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		req, ok := request.(*ReverseRequest)
		if !ok {
			level.Error(logger).Log("message", "invalid request")
			return nil, errors.New("invalid request")
		}
		reverseString := svc.IsPal(ctx, req.Word)
		return &ReverseResponse{
			Word: reverseString,
		}, nil
	}
}

func wrapEndpoint(e endpoint.Endpoint, middlewares []endpoint.Middleware) endpoint.Endpoint {
	for _, m := range middlewares {
		e = m(e)
	}
	return e
}
