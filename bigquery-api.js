const fs = require('fs')
const jwt = require('jsonwebtoken')


const projectId = 'light-cathode-250002'
const privateKeyFile = 'C:/Users/lenovo/.ssh/jwtRS256.key'
const algorrithm = {algorithm:'RS256'}


function createJwt(projectId,privateKeyFile,algorithm){
    const token = {
        "iss":"google-storage-vidio-stream@light-cathode-250002.iam.gserviceaccount.com",
        // "scope":"https://www.googleapis.com/auth/bigquery",
        // "aud":"https://www.googleapis.com/oauth2/v4/token",
       
        "aud":"https://oauth2.googleapis.com/token",
        "iat":parseInt(Date.now()/1000),
        "exp":parseInt(Date.now()/1000) + 2*60
    }

    console.log('Get Private Key...')
    const privateKey = fs.readFileSync(privateKeyFile,'utf-8').toString()
    console.log(privateKey)
    console.log('Receive Private Key...')
    const generateToken = jwt.sign(token,privateKey,algorithm)
    console.log(generateToken)
}

createJwt(projectId,privateKeyFile,algorrithm)