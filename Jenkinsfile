pipeline {
    agent any
    
    tools {
        nodejs "node"
    }
    
    environment {
        DOCKERHUB_REGISTRY = 'oscarecheverria1996/nest-app'
        DOCKERHUB_CREDENTIALS_ID = 'dockerhub_credentials'
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
            steps {
                withCredentials([usernamePassword(
                credentialsId: DOCKERHUB_CREDENTIALS_ID,
                passwordVariable: 'DOCKERHUB_PASSWORD',
                usernameVariable: 'DOCKERHUB_USERNAME')]){
                    sh 'docker login -u ${DOCKERHUB_USERNAME} -p ${DOCKERHUB_PASSWORD}'
                    sh 'docker push ${DOCKERHUB_REGISTRY}:${BUILD_NUMBER}'
                }
            }
        }
    }

    post {
        always {
        sh 'docker logout'
        }
    }
}