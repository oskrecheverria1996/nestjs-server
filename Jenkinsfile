pipeline {
    agent any
    
    tools {
        nodejs "node"
    }
    
    stages {
        stage("Instalando dependencias"){
            steps {
                bat "npm install"
            }
        }
        stage("Build docker image"){
            steps {
                script {
                    bat "docker build -t nest-app ."
                }
            }
        }
    }
}