function getFilename(path) {
	var parts = path.split('/');
	return parts[parts.length - 1];
}