def userInput = true
def didTimeout = false

pipeline {
    agent any 
    tools {
        nodejs 'Nodejs'
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
        
        stage('Slave'){
            agent { node { label "Slave" } }
            steps{
                //dir("${env.WORKSPACE}/node-jenkins"){
                    script{
                        sh 'echo "Holi Slave"'
                    }
                //}
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
        
        stage('Pregunta'){
            steps{
                script{
                    preguntar()
                    if (didTimeout) {
                        echo "No seleccionó ninguna opcion"
                    } else if (userInput == true) {
                        echo "Aceptó"
                    } else {
                        echo "Abortó"
                        currentBuild.result = 'FAILURE'
                    } 
                }
            }
        }
        
        stage('Deploy') {
            /*when {
                expression {
                    currentBuild.previousBuild.result == 'SUCCESS'
                }
            }*/
            steps {
                script {
                    sh 'npm start-dev'
                }
            }
        }
    }
}

def preguntar() {
    try {
        timeout(time: 15, unit: 'SECONDS') { // change to a convenient timeout for you
            userInput = input(
            id: 'Proceed', message: 'Pasamos a la siguiente etapa?', parameters: [
            [$class: 'BooleanParameterDefinition', defaultValue: true, description: '', name: 'Confirmo bajo mi responsabilidad que pasará a la siguiente etapa']
            ])
        }
    } catch(err) { // timeout reached or input false
        def user = err.getCauses()[0].getUser()
        if('SYSTEM' == user.toString()) { // SYSTEM means timeout.
            didTimeout = true
        } else {
            userInput = false
            echo "Detenido Por: [${user}]"
        }
    }
}
    