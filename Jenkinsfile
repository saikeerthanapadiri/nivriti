
pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
                echo 'Nivriti source code checked out successfully'
            }
        }

        stage('Build') {
            steps {
                bat '.\\mvnw.cmd -B clean compile'
            }
        }

        stage('Test') {
            steps {
                bat '.\\mvnw.cmd -B test'
            }
            post {
                always {
                    junit allowEmptyResults: true,
                          testResults: '**/target/surefire-reports/*.xml'
                }
            }
        }

        stage('Package') {
            steps {
                bat '.\\mvnw.cmd -B package -DskipTests'
            }
            post {
                success {
                    archiveArtifacts artifacts: 'target/*.jar',
                                     fingerprint: true
                }
            }
        }
    }
}
