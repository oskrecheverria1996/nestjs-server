pipeline {
    agent any
    
    tools {
        nodejs "node"
    }
    
    stages {
        stage("Instalando dependencias"){
            steps {
                sh "npm install"
            }
        }
        stage("Build docker image"){
            steps {
                script {
                    sh "docker build -t nest-app ."
                }
            }
        }
    }
}