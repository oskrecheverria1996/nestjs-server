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
                    bat "docker build -t ${DOCKERHUB_REGISTRY} ."
                }
            }
        }
       stage('Login to Dockerhub') {
        steps {
                bat "echo ${DOCKERHUB_CREDENTIALS_PSW} | docker login -u ${DOCKERHUB_CREDENTIALS_USR} --password-stdin"
            }
       }
    }

    post {
        always {
        bat 'docker logout'
        }
    }
}