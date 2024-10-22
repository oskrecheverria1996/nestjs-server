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
        stage('Login to dockerhub'){
            steps {
                bat 'docker login -u oscarecheverria1996 -p dckr_pat_81zIos6CKMKuv5kdhHH5oz7-5GE'    
            }
        }
        stage('Push image on dockerhub'){
            steps {
                bat 'docker push oscarecheverria1996/nest-app:latest'
            }
        }
    }

    post {
        always {
        bat 'docker logout'
        }
    }
}