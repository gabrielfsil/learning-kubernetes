# Escalando Horizontamente com Kubernetes

## Descrição da aplicação

A aplicação se trata de 3 serviços: um producer, uma fila e um consumer.

O producer, que é uma API que recebe uma requisição `POST http://localhost:3333` com o compa `total` no `body`. Esse total representa a quantidade de mensagens que serão adicionadas na fila.

A fila foi implementada usando RabbitMQ para gerenciar a troca de mensagens entre os serviços.

O consumer, que se conecta a fila e fica escutando as mensagens adicionadas para executar a tarefa designada a ela. Nesse caso ela realiza o envio de emails.

## Execução
