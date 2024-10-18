pipeline {
    agent any
    
    environment {
        PORT=3000
        MONGO_URL="mongodb://mongo-user:123456@localhost:27017"
        MONGO_DB_NAME="mystore"
        
        JWT_SEED="CuaLqi3r_CoSaQu3UstEd3sQuiEran"
        
        SEND_EMAIL=false
        MAILER_SERVICE="gmail"
        MAILER_EMAIL="oskr.echeverria1996@gmail.com"
        MAILER_SECRET_KEY="vmmxgfjddduxbxyq"
        
        WEBSERVICE_URL="http://localhost:3000/api"
    }
    
    tools {
        nodejs "node"
    }
    
    stages {
        stage("Clonando repositorio"){
            steps {
                git "https://github.com/oskrecheverria1996/nestjs-server.git"
            }
        }
        stage("Instalando dependencias"){
            steps {
                bat "npm install"
            }
        }
        stage("Build"){
            steps {
                bat "npm run build"
            }
        }
    }
}