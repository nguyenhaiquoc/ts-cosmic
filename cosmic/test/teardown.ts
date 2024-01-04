// Function to stop Docker Compose
const stopDockerCompose = () => {
  /*
  try {
    execSync('docker-compose -f ./devops/docker-compose.yaml down', {
      stdio: 'inherit',
    });
    console.log('Docker Compose stopped successfully.');
  } catch (error) {
    console.error('Failed to stop Docker Compose:', error);
    process.exit(1);
  }
  */
};

// Start Docker Compose before running tests
export default stopDockerCompose;
