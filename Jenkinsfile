pipeline {
    agent any
    
    tools {
        nodejs "node"
    }
    
    environment {
        DOCKERHUB_REGISTRY = 'oscarecheverria1996/nest-app'
        DOCKERHUB_CREDENTIALS = credentials('dockerhub_credentials')
    }
    
    stages {
        stage("Install dependencies"){
            steps {
                bat "npm install"
            }
        }
        stage("Build docker image"){
            steps {
                script {
                    bat "docker build -t oscarecheverria1996/nest-app ."
                }
            }
        }
    }

    post {
        always {
        bat 'docker logout'
        }
    }
}