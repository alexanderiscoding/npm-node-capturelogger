# CaptureLogger for Node.js

Um complemento para reportar logs em seus projetos Node.js.

- Execute `npm i node-capturelogger` para instalar o package

## Configurando o package

Adicione em seu package.json as definições necessárias

- `CaptureLogger`: Object | Se existir enviará os logs para a API | Se não existir mostra os logs no console
- `id`: String | Preencha com o serviceID
- `token`: String | Preencha com o token de inserção do CaptureLogger
- `source`: String (Opcional) | Preencha com uma identificação para saber a origem do log
- `ignore`: Object (Opcional) | Preencha com o/os `action` a ser ignorado ao enviar
- `SenderMessage`: Number (Opcional) | `1` Telegram - `2` Discord - `3` Slack - `4` Google Chat - Para definir um serviço de mensagem especifica com o [SenderMessage](https://docs.alexanderiscoding.com/package/sendermessage)

Exemplo de um package.json

```json
{
  "name": "builder",
  "version": "1.0",
  "private": true,
  "CaptureLogger": {
    "id": "-R_kygYubudf89d",
    "token": "2854d46s4sdfsdfs6fds6fds6f6",
    "source": "My App API",
    "ignore": ["autorizeUser", "CheckVersion"],
    "SenderMessage": 1
  },
  "scripts": {
    "dev": "next dev"
  }
}
```

## Método de uso

Importe o package na sua aplicação

`import captureLogger from 'node-capturelogger';`

`const captureLogger = require('node-capturelogger');`

Registre os logs de evento

`captureLogger(action, log, userAgent);`

> é possivel alterar o nome da function de acordo com o seu gosto.

- `action`: String | Nome do código de referência
- `log`: Any | Erro do código de referência
- `userAgent`: Any | userAgent do headers
