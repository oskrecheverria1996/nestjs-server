pipeline {
    agent any
    
    environment {

    }
    
    tools {
        nodejs "node"
    }
    
    stages {
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