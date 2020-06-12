# Keeper Info Server Api
Esta es una GraphQL API hecha en node, mas específicamente exress.js, junto a MongoDB para la persistencia de datos. El mismo se encuentra alojado en un servidor gratuito de heroku para servir al frontend de Keeper. Dicho servidor se puede acceder mediante el siguiente enlace:

    > https://keeper-notess.herokuapp.com/

Al acceder a la url uno va a poder realizar Querys y Mutaciones con la ayuda del asistente de de GraphQl.

## Instalación
Lo único que se requiere para su su uso es tener previamente instalado node.js.

### Requisitos
Para el funcionamiento correcto de la api se necesitará configurar las variables correspondiente a las credenciales de la base de datos (en este casa es una base de datos provista por Mongo Atlas) y del gmail para el envió de correo

#### Variables de entorno
Las variables de entorno necesairas son las siguientes:

- PORT: se define el puerto en donde será levantado el servidor.
- AUTHENTICATION_SECRET: se define el secret con el cual se firmaran los jwt tokens.
- NODE_ENV: determinará si nuestra app se encuentra en desarrollo o producción.
- MAIL_CLIENT_ID: se define el client-id de la cuenta de google para el servicio de correos.
- MAIL_CLIENT_SECRET: se define el client-secret de la cuenta de google para el servicio de correos.
- MAIL_ACCESS_TOKEN: se define el access token de la cuenta de google para el servicio de correos.
- MAIL_REFRESH_TOKEN se define el refresh token de la cuenta de google para el servicio de correos.

Las mismas se pueden ver en el archivo .env.default 

### Comandos
- La primera vez que lo bajemos el repositorio deberemos ejecutar el siguiente comando para que se bajen las dependecias necesarias.

> npm i

- El siguiente comando será usado para ejecutar el servidor en modo desarrollo.

> npm run dev

- El siguiente comando será usado para ejecutar el servidor en modo producción.

> npm start

## Estructura

### Tipo de Datos

#### User
Es la clase que representa a los usuarios del sistema.
- _id: ID
- name: String
- email: String
- section: [Section]

#### Section
Es la clase que representa las diferentes categorías que posee cada usuario.
- _id: ID
- color: String
- icon: String
- title: String
- description: String
- cards: [Card]

#### Card
Es la clase que representa las diferentes notas que contiene cada una de las secciónes.
- _id: ID
- color: String
- title: String
- description: String

### Distribución del proyecto

### Querys

- authenticate: { User }
- getUserByCode( code: String! ): { User}
- getCards( section: String! ): [Card]

### Mutaciones

- checkCode(code: String!): Boolean
- changePassword(oldPassword: String!, newPassword: String!): Boolean
- login(username: String!, password: String! : { User }
- singup(input: UserInput): { User }
- logout: Boolean
- sendCodEmail(username:String!): Boolean
- recoveryPassword(code:String!,newPassword: String!): Boolean
- createSection(input: SectionInput!): [Section]
- deleteSection(title: String!): [Section]
- editSection(oldTitle: String!, input: SectionInput!): [Section]
- createCard(section: String!, input: CardInput!): [Card]
- deleteCard(section: String!, card: String!): [Card]
- editCard(section: String!, card: String!, input: CardInput!): [Card]
   

