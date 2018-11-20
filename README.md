# lint-me

lint-me was designed with the goal of creating a central linting package for eslint, stylelint and tslint. It serves as a gentle wrapper around those libraries and provides sensible default config files for each linter. 

## Usage  
    $ lint-me <files> <options> 

    Files   <file-glob>     Files you would like to lint
    Options
        --fix           Autofix linting errors where possible
        --config, -c    Path to linting config file
        --type, -t      The type of linter you would like to use. Options are js, ts and style
        --quiet, -q     Hides logging

    Options relate to the type of file you're trying to lint. See the linters docs for complete options.

    Examples 
        $ lint-me ./**/*.ts --fix -t ts
        $ lint-me ./src/**/*.js --config ./config/.eslintrc --type js
        $ lint-me ./**/*.scss