File Icons
==========
File-specific icons in Atom for improved visual grepping.

<img alt="Icon previews" width="850" src="https://raw.githubusercontent.com/DanBrooker/file-icons/6714706f268e257100e03c9eb52819cb97ad570b/preview.png" />

Supports the following packages:

* [`tree-view`](https://atom.io/packages/tree-view)
* [`tabs`](https://atom.io/packages/tabs)
* [`fuzzy-finder`](https://atom.io/packages/fuzzy-finder)
* [`find-and-replace`](https://atom.io/packages/find-and-replace)
* [`archive-view`](https://atom.io/packages/archive-view)


Installation
------------
Open **Settings** → **Install** and search for `file-icons`.

Alternatively, install through command-line:

	apm install file-icons


Customisation
-------------
Everything is handled using CSS classes. Use your [stylesheet][1] to change or tweak icons.

Consult the package stylesheets to see what classes are used:

* **Icons:**   [`styles/icons.less`](./styles/icons.less)
* **Colours:** [`styles/colours.less`](./styles/colours.less)
* **Fonts:**   [`styles/fonts.less`](./styles/fonts.less)


#### Icon reference
* [**File-Icons**](https://github.com/Alhadis/FileIcons/blob/master/charmap.md) 
* [**FontAwesome**](http://fontawesome.io/cheatsheet/)
* [**Mfizz**](https://github.com/Alhadis/MFixx/blob/master/charmap.md)
* [**Devicons**](https://github.com/Alhadis/DevOpicons/blob/master/charmap.md)



#### Examples

* **Resize an icon:**
	~~~less
	.html5-icon:before{
		font-size: 18px;
	}
	
	// Resize in tab-pane only:
	.tab > .html5-icon:before{
		font-size: 18px;
		top: 3px;
	}
	~~~


* **Choose your own shades of orange:**
	~~~css
	.dark-orange   { color: #6a1e05; }
	.medium-orange { color: #b8743d; }
	.light-orange  { color: #cf9b67; }
	~~~


* **Bring back PHP's blue-shield icon:**
	~~~css
	.php-icon:before{
		font-family: MFizz;
		content: "\f147";
	}
	~~~


* **Assign icons by file extension:**
	~~~css
	.icon[data-name$=".js"]:before{
		font-family: Devicons;
		content: "\E64E";
	}
	~~~


* **Assign icons to directories:**
	~~~less
	.directory > .header > .icon{
		
		&[data-path$=".atom/packages"]:before{
			font-family: "Octicons Regular";
			content: "\f0c4";
		}
	}
	~~~



Troubleshooting
---------------

**A file's icon has stopped updating:**  
It's probably a caching issue. Do the following:

1. Open the command palette: <kbd>Cmd/Ctrl + Shift + P</kbd>
2. Run `file-icons:clear-cache`
3. Reload the window, or restart Atom


**The tree-view's files are borked and [look like this][6].**  
If you haven't restarted Atom since upgrading to [File-Icons v2][v2.0], do so now.

If restarting doesn't help, your stylesheet probably needs updating. See below.


**My stylesheet has errors since updating:**  
As of [v2.0][], classes are used for displaying icons instead of mixins. Delete lines like these from your stylesheet:

~~~diff
-@import "packages/file-icons/styles/icons";
-@import "packages/file-icons/styles/items";
-@{pane-tab-selector},
.icon-file-directory {
	&[data-name=".git"]:before {
-		.git-icon;
+		font-family: Devicons;
+		content: "\E602";
	}
}
~~~

Instead of `@pane-tab…` variables, use `.tab > .icon[data-path]`:

~~~diff
-@pane-tab-selector,
-@pane-tab-temp-selector,
-@pane-tab-override {
+.tab > .icon {
 	&[data-path$=".to.file"] {
 		
 	}
}
~~~

These CSS classes are no longer used, so delete them:

~~~diff
-.file-icons-force-show-icons,
-.file-icons-tab-pane-icon,
-.file-icons-on-changes
~~~


**It's something else.**  
Please [file an issue][7]. Include screenshots if necessary.



Acknowledgements
----------------
Wouldn't have even tried to make this if it weren't for [sommerper/filetype-color][8].
Also thanks to all the [contributors][9].


[Referenced links]: ____________________________________________________
[1]: http://flight-manual.atom.io/using-atom/sections/basic-customization/#style-tweaks
[4]: https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors
[5]: https://github.com/Alhadis/DevOpicons/blob/master/charmap.md#JavaScript
[6]: https://cloud.githubusercontent.com/assets/714197/21516010/4b79a8a8-cd39-11e6-8394-1e3ab778af92.png
[7]: https://github.com/DanBrooker/file-icons/issues/new
[8]: https://github.com/sommerper/filetype-color
[9]: https://github.com/DanBrooker/file-icons/graphs/contributors
[v2.0]: https://github.com/DanBrooker/file-icons/releases/tag/v2.0.0
