pipeline {
    agent any
    
    tools {
        nodejs "node"
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
                    bat "docker build -t nest-app ."
                }
            }
        }
        stage('Push docker image'){  
            environment {
                DOCKERHUB_REGISTRY = 'oscarecheverria1996/nest-app'
            }
            steps {
                script {
                    bat 'docker push ${DOCKERHUB_REGISTRY}:latest'
                }
            }
        }
    }
}

post {
    always {
    bat 'docker logout'
    }
}