  const dotenv = require('dotenv')
const FtpDeploy = require('ftp-deploy')
const path = require('path')

dotenv.config({ path: './.env' })

async function main() {
  try {
    // Replace "/out" with your build directory which contains all generated static files
    const outDir = path.join(process.cwd(), process.env.BUILD_DIRECTORY || '/out')
    await new FtpDeploy().deploy({
      user: process.env.FTP_USER, // Your credentials
      password: process.env.FTP_PASS, // Your credentials
      host: process.env.FTP_HOST, // Your credentials
      port: 21, // Your credentials

      localRoot: outDir, // Location of build files in project
      remoteRoot: process.env.REMOTE_DIRECTORY, // Upload location on remote, replace with subfolder on FTP-server if required

      include: ['*', '**/*'], // Upload all files from build folder
      exclude: [], // Exclude no files

      deleteRemote: process.env.DELETE_REMOTE || false, // Set to true if you want to delete ALL FILES in the remote root before uploading
      forcePasv: true, // Use passive mode,
    })

    console.log('Succesfully deployed site')
    return 0
  } catch (e) {
    console.error('An error occured during deployment:', e)
    return 1
  }
}

main().then((code) => process.exit(code))
