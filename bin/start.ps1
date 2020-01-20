function CommandExists {
  param ($command)
  $oldPreference = $ErrorActionPreference
  $ErrorActionPreference = 'stop'
  if (Get-Command $command) {
      RETURN $true
  }
} #end function CommandExists

$oldPreference = $ErrorActionPreference
$ErrorActionPreference = 'stop'

if ($(CommandExists docker-compose)) {
  try {
    docker-compose run --rm local yarn
    docker-compose up local

    RETURN $true
    $ErrorActionPreference = $oldPreference
  }
  catch {
    Write-Host "Failed to use Docker Compose"
  }
}

if ($(CommandExists yarn)) {
  try {
    yarn
    yarn start

    RETURN $true
    $ErrorActionPreference = $oldPreference
  }
  catch {
    Write-Host "Failed to use Yarn"
  }
}

if ($(CommandExists npm)) {
  try {
    npm install
    npm run start

    RETURN $true
    $ErrorActionPreference = $oldPreference
  }
  catch {
    Write-Host "Failed to use NPM"
  }
}

Write-Host "Failed to start the assessment. Please ensure you have Docker for Windows or NodeJS installed."
RETURN $false
$ErrorActionPreference = $oldPreference
