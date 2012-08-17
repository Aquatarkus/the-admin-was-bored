The Admin was Bored
===================
A Chrome extension that watches response headers for Easter eggs.

Installation
------------
1. Get the files.
2. Enable _Developer mode_ in [Chrome Extensions config](chrome://chrome/extensions/).
3. Choose _Load unpaced extension..._ and choose the folder where you downloaded the files.
4. Optionally choose _Allow in incognito_.*
5. Start browsing and you'll get alerts if any response headers have Easter eggs. Usually they're job offers.

* Allowing the extension to run in incognito is safe because the only data persisted past a browsing session is the list of ignored header names.

Usage
-----
The Admin was Bored will sit quietly in the background, watching response headers and letting you know if any show up that aren't in the ignore list. The ignore list starts with all the common header names you'd expect (`content-type`, `expires`, `keep-alive`), but if you come across a site that responds with a `x-polybius`, The Admin was Bored will tell you. If you encounter uncommon but uninteresting ones, like `some-boring-request-id`, click that header name in the popup to ignore it going forward.

Changes
-------
### 0.1.1
Cleaning stuff up, including switching to the new Chrome extension manifest format

### 0.1.0
First release

License
-------
MIT