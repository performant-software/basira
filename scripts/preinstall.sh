 #!/bin/bash

# Generates an SSH config file for connections if a config var exists.
if [ "$REACT_COMPONENTS_SSH_KEY" != "" ]; then
  echo "Detected SSH key for react-components repo." >&1
fi

if [ "$RESOURCE_API_SSH_KEY" != "" ]; then
  echo "Detected SSH key for resource-api repo." >&1
fi

# Ensure we have an ssh folder
if [ ! -d ~/.ssh ]; then
  mkdir -p ~/.ssh
  chmod 700 ~/.ssh
fi

# Load the private keys into a file.
echo $REACT_COMPONENTS_SSH_KEY | base64 --decode > ~/.ssh/deploy_key_react_components
echo $RESOURCE_API_SSH_KEY | base64 --decode > ~/.ssh/deploy_key_resource_api

# Change the permissions on the file to be read-only for this user.
chmod 400 ~/.ssh/deploy_key_react_components
chmod 400 ~/.ssh/deploy_key_resource_api

# Setup the ssh config file.
echo -e "Host react-components\n"\
        " HostName github.com\n"\
        " IdentityFile ~/.ssh/deploy_key_react_components\n"\
        " IdentitiesOnly yes\n"\
        " UserKnownHostsFile=/dev/null\n"\
        " StrictHostKeyChecking no"\
        "\n"\
        "Host resource-api\n"\
        " HostName github.com\n"\
        " IdentityFile ~/.ssh/deploy_key_resource_api\n"\
        " IdentitiesOnly yes\n"\
        " UserKnownHostsFile=/dev/null\n"\
        " StrictHostKeyChecking no"\
        > ~/.ssh/config