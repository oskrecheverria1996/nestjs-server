pipeline {
    agent any
    
    environment {

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