tunnel:
	npx expo start --tunnel

start:
	npm start

publish:
	npm publish --dry-run

build:
	eas build -p android --profile preview