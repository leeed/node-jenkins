def userInput = true
def didTimeout = false

pipeline {
    agent any 
    tools {
        nodejs 'node 10.16.3'
    }
    stages{
        
        stage('docker'){
            steps {
                script {
                    node {
                        def app

                        stage('Clone repository') {
                            checkout scm
                        }

                        stage('Build image') {  
                            app = docker.build("node.jenkins.image")
                        }

                        stage('Test image') {
                            app.inside {
                                sh 'echo "Tests passed"'
                            }
                        }              
                    }                 
                }
            }
        }
        
        stage('StartUp'){
            steps{
                //dir("${env.WORKSPACE}/node-jenkins"){
                    script{
                        sh 'npm install'
                    }
                //}
            }
        }
        
        stage('Testing'){
            steps{
                //dir("${env.WORKSPACE}/node-jenkins"){
                    script{
                        sh 'npm run test'
                    }
                //}
            }
            post {
                failure{
                    echo 'Tests failed'
                }
            }
        }
        stage('Build') {
            steps {
                //dir("${env.WORKSPACE}/node-jenkins"){
                    script {
                        sh 'npm run build'
                    }
                //}
            }
            post{
                success{
                    echo "${env.BUILD_URL} has result success"
                }
                failure{
                    emailext body: 'Error on Jenkins Build ${env.BUILD_URL}', recipientProviders: [[$class: 'DevelopersRecipientProvider'], [$class: 'RequesterRecipientProvider']], subject: 'Jenkins Error'
                }
                aborted {
                    echo "Aborted"
                }
            }
        }
        
        stage('Deploy') {
            steps {
                script {
                    sh 'npm run start-dev'
                }
            }
        }
    }
}