
# NIP's Implementation of Translator API Using Azure Cognitive Services


---





<img src="https://img.shields.io/badge/Table--of--Contents-Links-blue" width=20%> 



- [ ] [Installation](#Setup-and-Installation)
    -  [Environment Variables](#Environment-Variables)
    -  [Dependencies](#Dependencies)
    -  [Running the Server](#Running-the-Server)
- [ ] [Overview](#Overview)
    -  [Description](#Description)
    -  [Authentication](#Authentication)
    -  [Endpoints](#Endpoints)    
- [ ] [Quick Links](#Quick-Links)
    -  [Enterprise API](http://api.findasnake.com/api-docs/)
    -  [Client Application](http://api.findasnake.com/)
- [ ] [Team Members](#Team-Members)



### Overview

---

 


#### Description
---

This Project is created to serve as a connector between Azure Translate and a Client Application. It is a REST API that can be used to translate text from one language to another. It is built using Node.js and Express.js. It uses Azure Cognitive Services to translate the text. It is deployed on Azure App Service.

---

#### Authentication
---

Passowrd for Enterprise API : **p@ssW0rd**

Header : **Authorization** : **p@ssW0rd**


---

#### Endpoints
---

| Endpoint | Description | Request Body | Response Body |
| --- | --- | --- | --- |
| `/API/translate` | Translates text from one language to another | `{"text": "Hello World", "to": "es"}` | `{"text": "Hola Mundo"}` |
| `/API/detect` | Detects the language of the text | `{"text": "Hello World"}` | `{"language": "en"}` |
| `/API/transliterate'` | Transliterates text from one language to another | {  "text":"Hello World",  "language": "ar",  "fromScript": "Latn",  "toScript": "Arab"} | `{"text": "مرحبا بالعالم"}` | 


Example Request:



```bash
curl -X 'POST'  '/API/detect?text="amor"'   -H 'accept: application/json'  -H 'Authorization: p@ssw0rd'   -d ''

  # Response
   {
    "language": "es",
    "score": 1,
    "isTranslationSupported": true,
    "isTransliterationSupported": true
  }
```


#### Environment Variables

**Linux/MacOS:**

```bash
export TRANSLATOR_TEXT_REGION="eastus" #or any other region
export TRANSLATOR_TEXT_RESOURCE_KEY="YOUR_KEY_HERE"
export TRANSLATOR_TEXT_ENDPOINT="https://api.cognitive.microsofttranslator.com"
export SECRET="YourSecret"
export PORT=8080 #optional
```

**Windows:**

```powershell
set TRANSLATOR_TEXT_REGION="eastus" #or any other region
set TRANSLATOR_TEXT_RESOURCE_KEY="YOUR_KEY_HERE"
set TRANSLATOR_TEXT_ENDPOINT="https://api.cognitive.microsofttranslator.com"
set SECRET="YourSecret"
set PORT=8080 #optional
```

#### Dependencies

```bash
cd LanguageOne
npm install
```
#### Running-the-Server

```bash
node app.js #or pm2 start app.js
```



### Quick Links

---


    
  - [ ] [Enterprise API](http://api.findasnake.com/api-docs/)

  - [ ] [Client Application](http://api.findasnake.com/)

### Team Members

---

<table center>
  <thead allign=center>
    <tr>
      <th align=center > <img src="https://img.shields.io/badge/-Murtadha Marzouq-red" href="findasnake.com" width="100%"/></th>
      <th align=center><img src="https://img.shields.io/badge/-Ryan Hull-orange" width="75%"/></th>
      <th align=center><img src="https://img.shields.io/badge/-Scarlett Dong-yellow" width="75%"/>  </th>
      <th align=center><img src="https://img.shields.io/badge/-Zhi Wang -green" width="75%"/> </th>
    <th align=center><img src="https://img.shields.io/badge/-Mohammed Arif -blue" width="75%"/> </th>
    </tr>  
    </tr>

    

  </thead>
  <tbody >
    <tr>
      <td>
        <a href="">
          <img src="https://avatars.githubusercontent.com/u/45076915?s=200&v=4"  alt="Murtadha Marzouq" width="384" />
        </a>
      </td>
      <td>
        <a href="">
          <img src="https://capstone-front-end-lime.vercel.app/_next/image?url=%2FTeamPhotos%2FRyan_Hull.jpeg&w=384&q=75" alt="Ryan Hull" width="384"/>
        </a>
      </td>
      <td>
        <a href="">
          <img src="./Scarlett.jpg" alt="Scarlett" width="384"/>
        </a>
      </td>
      <td>
        <a href="">
          <img src="./Zhi.jpg" alt="Zhi" width="384"/>
        </a>
      </td>
     <td>
        <a href="">
          <img src="./Arif.jpg" alt="Zhi" width="384"/>
        </a>
      </td>


  </tbody>
</table>
