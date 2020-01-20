# Cryptocurrency Portfolio
Hiring assessment for frontend web application development using React.

## Setup
### Windows
#### Prerequisites
**Docker Desktop for Windows** or **NodeJS**

#### Instruction
1. If you are using Docker Desktop for Windows, rename `docker-compose.override.yml.example` to `docker-compose.override.yml` and change the settings to suit your environment
2. With administrative privileges, run `.\bin\start.cmd` on Command Prompt or Powershell

### Unix-Based Operating Systems
#### Prerequisites
**Docker** (**Docker Desktop for Mac** on macOS) or **NodeJS**

#### Instruction
Follow the instruction from **one of the following** depending on which software you have installed.

##### Docker
1. Rename `docker-compose.override.yml.example` to `docker-compose.override.yml` and change the settings to suit your environment
2. Run `./bin/docker` on console

##### Yarn
1. Run `./bin/yarn`

##### NPM
1. Run `./bin/npm`

## Tips
1. Give running commentary of your thought process so we can best understand your approach.
2. You can use any libraries you want. There's no need to reinvent the wheel.
3. Feel free to Google. We're not testing your memory.
4. We encourage you to ask questions and involve your intelliHR engineer. You can almost think of this as a pair programming exercise.
5. If you'd like to be adventurous (e.g. use Redux, functional programming, etc.), impress us!

## Project: Cryptocurrency Portfolio
Please read all of the project details before starting. Feel free to complete them in any order that makes sense to you.

### User Stories
1. I must be able to record a transaction with the following details:
   - What cryptocurrency was purchased
   - How many units of the cryptocurrency were purchased
   - What was the total purchase price, in AUD, of the transaction
2. I must be able to see a list of all of my recorded transactions grouped by cryptocurrency. For each cryptocurrency owned, show the following:
   - Units owned
   - Total paid in AUD
3. I must be able to see the sum total AUD I have paid for all of my cryptocurrencies.
4. I must be able to delete transactions.
5. I must be able to edit transactions.

### Stretch Goals
1. I may be able to see the value of my cryptocurrencies based on the current price published by an exchange or index website. For example,  CoinMarketCap Public API (https://coinmarketcap.com/api/).
