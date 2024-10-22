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
                DOCKERHUB = credentials('dockerhub_credentials')
            }
            steps {
                withCredentials([usernamePassword(
                credentialsId: DOCKERHUB,
                passwordVariable: 'DOCKERHUB_PSW',
                usernameVariable: 'DOCKERHUB_USR')]){
                    bat 'docker login -u ${DOCKERHUB_USR} -p ${DOCKERHUB_PSW}'
                    bat 'docker push ${DOCKERHUB_REGISTRY}:latest'
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