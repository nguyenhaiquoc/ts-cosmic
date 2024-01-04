import { execSync } from 'child_process';

// Function to start Docker Compose
const startDockerCompose = () => {
  try {
    // start Docker Compose in detached mode, the files is in /devops/docker-compose.yml
    execSync(
      'docker-compose -f ./devops/docker-compose.yaml up -d --no-recreate',
      {
        stdio: 'inherit',
      },
    );
    console.log('Docker Compose started successfully.');
  } catch (error) {
    console.error('Failed to start Docker Compose:', error);
    process.exit(1);
  }
};

// Start Docker Compose before running tests
export default startDockerCompose;
