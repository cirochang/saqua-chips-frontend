rm -rf dist
cross-env NODE_ENV=production webpack --progress --hide-modules
zip -r saqua-chips-frontend.zip dist index.html
