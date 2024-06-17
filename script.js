function unzipFile() {
  const fileInput = document.getElementById('fileInput');
  const output = document.getElementById('output');
  const file = fileInput.files[0];

  if (!file) {
    output.innerHTML = '<p>Please select a file.</p>';
    return;
  }

  if (!file.name.endsWith('.zip')) {
    output.innerHTML = '<p>Please select a .zip file.</p>';
    return;
  }

  const reader = new FileReader();

  reader.onload = function(event) {
    const arrayBuffer = event.target.result;
    JSZip.loadAsync(arrayBuffer).then(function(zip) {
      output.innerHTML = ''; // Clear previous output

      zip.forEach(function(relativePath, zipEntry) {
        if (!zipEntry.dir) { // Not a directory
          zipEntry.async('blob').then(function(content) {
            const div = document.createElement('div');
            const link = document.createElement('a');
            link.href = URL.createObjectURL(content);
            link.download = zipEntry.name;
            link.textContent = zipEntry.name;
            div.appendChild(link);
            output.appendChild(div);
          });
        }
      });
    });
  };

  reader.readAsArrayBuffer(file);
}
