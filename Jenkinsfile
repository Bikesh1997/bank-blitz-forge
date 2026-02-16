pipeline {
  agent any

  tools {
    nodejs "Node18"   // Name configured in Jenkins Global Tool Config
  }

  environment {
    CI = "true"
  }

  stages {

    stage('Checkout') {
      steps {
        git branch: 'main', url: 'https://github.com/your-org/your-react-app.git'
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }

    stage('Test') {
      when {
        expression { fileExists('package.json') }
      }
      steps {
        sh 'npm test -- --watchAll=false'
      }
    }
  }

  post {
    success {
      echo '✅ Build Successful'
    }
    failure {
      echo '❌ Build Failed'
    }
  }
}
