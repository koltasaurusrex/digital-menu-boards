FROM golang:latest

WORKDIR /usr/src/app

# Install the air binary so we get live code-reloading when we save files
RUN curl -sSfL https://raw.githubusercontent.com/cosmtrek/air/master/install.sh | sh -s -- -b $(go env GOPATH)/bin

COPY go.mod go.sum ./
RUN go mod download && go mod verify

COPY . .
RUN go build -v -o ./hello .

ENV PORT=5555

EXPOSE 5555
CMD ["air", "/usr/src/app/hello"]