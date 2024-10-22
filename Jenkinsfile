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
                    bat "docker build -t nest-app ."
                }
            }
        }
        stage('Push docker image'){
            steps {
                withCredentials([usernamePassword(
                credentialsId: DOCKERHUB_CREDENTIALS,
                passwordVariable: 'DOCKERHUB_CREDENTIALS_PSW',
                usernameVariable: 'DOCKERHUB_CREDENTIALS_USR')]){
                    bat 'docker login -u ${DOCKERHUB_CREDENTIALS_USR} -p ${DOCKERHUB_CREDENTIALS_PSW}'
                    bat 'docker push ${DOCKERHUB_REGISTRY}:${BUILD_NUMBER}'
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