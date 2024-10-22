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
        stage('Login to Dockerhub'){
            steps {
                bat "docker login -u ${DOCKERHUB_CREDENTIALS_USR} -p ${DOCKERHUB_CREDENTIALS_PSW}"
            }
       }
       stage('Push image on Dockerhub'){
            steps {
                bat "docker push ${DOCKERHUB_REGISTRY}:latest"
            }
       }
    }

    post {
        always {
            bat 'docker logout'
        }
    }
}