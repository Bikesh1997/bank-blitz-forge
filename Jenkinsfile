pipeline {
  agent any

  tools {
    nodejs "Node18"
  }

  stages {

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
    expression { false }   // disables test stage
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
