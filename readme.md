#Holdem
Simplistic implementation of poker hand ranks.

`Current state is highly edgy and resides in the development branch.`

#Dev environment setup
##Clone the repository

    cd ~
    git clone https://github.com/nilobarp/holdem.git
    
##Install dependencies

    cd ~/holdem
    npm install
    
##Link `mocha` and `istanbul`

Skip over this step if mocha and istanbul are installed globally.

I like to install dev dependencies locally and to help `npm` find the binaries, put a sym link in `node_modules/bin`
    
    ln -s node_modules/mocha/bin/_mocha node_modules/bin/_mocha
    ln -s node_modules/istanbul/lib/cli.js node_modules/bin/istanbul
    
##Run `test`
    npm test
##Run code coverage
    npm run cover
