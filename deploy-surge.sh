#Build reactjs app with production mode 
yarn build

# Move to build folder
cd build

# Clone index.html into 200.html
cp index.html 200.html

# Start deploying via Surge
# The command means deploy current folder to domain paul-photo-app.surge.sh
surge . phototest-test.surge.sh
# surge --domain https://phototest-test.surge.sh/photos 