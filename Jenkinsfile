pipeline {
    agent any

    environment {
        // Defines the image tag we verified is working
        IMAGE_NAME = "nivriti:latest"
        CLUSTER_NAME = "kind"
    }

    stages {
        stage('1. Checkout Source Code') {
            steps {
                // Jenkins automatically pulls your code from your GitHub repository here
                checkout scm
            }
        }

        stage('2. Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                // Automates the "docker build" command we fixed earlier
                sh "docker build -t ${IMAGE_NAME} ."
            }
        }

        stage('3. Load Image into Kubernetes') {
            steps {
                echo 'Loading image into Kind cluster...'
                // Automates pushing the new image into your Kind nodes
                sh "kind load docker-image ${IMAGE_NAME} --name ${CLUSTER_NAME}"
            }
        }

        stage('4. Deploy to Kubernetes Cluster') {
            steps {
                echo 'Applying Kubernetes manifests...'
                // Automates applying your deployment and service configurations
                sh "kubectl apply -f deployment.yaml"
                sh "kubectl apply -f service.yaml"
            }
        }

        stage('5. Verify Rollout Deployment') {
            steps {
                echo 'Verifying Pod status...'
                // Checks rollout verification automatically
                sh "kubectl rollout status deployment/nivriti-deployment"
                sh "kubectl get pods"
                sh "kubectl get services"
            }
        }
    }
}
