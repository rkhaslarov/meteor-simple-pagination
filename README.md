rkhaslarov:simple-pagination
=================

This package provides a simple materializecss pagination based on Blaze templating.

# Usage
In the template helpers you need to define a helper which returns source for pagination (it can be array or number of total elements) and helper with settings object of pagination plugin.
```js
Template.myList.helpers({
	paginationSource: function() {
		return source; //For example, Collection.find({}).fetch() or Collection.find({}).fetch().length
	},
	paginationSettings: function() {
		return {
			perPage: 5, //Elements per page
			pageCount: 5, //Number of showed pages
			showPages: true, //Show or hide pages
			showPrevious: true, //Show or hide previous button
			showNext: true,//Show or hide next button
			sessionName: 'pagination-current-page', //Session variable name with current page number
			callback: function() { //Callback on click to page number 
				console.log('Pagination Click');
			},
		}
	}
});
```
In the template html file add this
```html
{{> pagination source=paginationSource settings=paginationSettings}}
```