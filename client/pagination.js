/*!
 * Pagination plugin for MeteorJS.
 *
 * Copyright Rufat Khaslarov.
 * Released under the MIT license
 *
 * Date: 2016-12-15T15:50Z
 */
Template.pagination.onCreated(function() {
	let data = Template.instance().data;

	this.settings = data.settings || {};

	let defaultSettings = {
		perPage: 10,
		pageCount: 5,
		showPages: true,
		showPrevious: true,
		showNext: true,
		sessionName: 'pagination-current-page',
		callback: function() {
		  console.log('Pagination Click');
		},
	}

	if (_.isEmpty(this.settings)) {
		this.settings = defaultSettings;
	} else {
		for (setting in defaultSettings) {
			let current = this.settings[setting];
			this.settings[setting] = _.isUndefined(current) ? defaultSettings[setting] : current;
		}
	}

	Session.set(this.settings.sessionName, 1);
});

Template.pagination.helpers({
	/**
	  * pages
	  *
	  * This helper returns list of rendered pages of pagination.
	  *
	  * @return array
	  */
	pages: function() {
		let result = [];
		let data = Template.instance().data;
		let settings = Template.instance().settings;
		let sessionName = settings.sessionName;
		
		settings.totalCount = _.isArray(data.source) ? data.source.length : data.source;

		let pageCount = Math.floor((settings.pageCount - 1) / 2);
		let pages = Array.apply(null, Array(Math.ceil(settings.totalCount / settings.perPage))).map(function (x, i) { return ++i; });
		
		let currentPage = Session.get(sessionName) ? Session.get(sessionName) : 1;
		let currentPageIndex = pages.indexOf(currentPage);

		for(let i = currentPageIndex - pageCount; i <= currentPageIndex + pageCount; i++) if(pages[i]) result.push(pages[i]);
		
		return result;
	},
	/**
	  * showPrevious
	  *
	  * This helper checks settings and get showPrevious property.
	  *
	  * @return boolean
	  */
	showPrevious: function() {
		let settings = Template.instance().settings;
		return settings && settings.showPrevious;
	},
	/**
	  * showNext
	  *
	  * This helper checks settings and get showNext property.
	  *
	  * @return boolean
	  */
	showNext: function() {
		let settings = Template.instance().settings;
		return settings && settings.showNext;
	},
	/**
	  * showPages
	  *
	  * This helper checks settings and get showPages property.
	  *
	  * @return boolean
	  */
	showPages: function() {
		let settings = Template.instance().settings;
		return settings && settings.showPages;
	},
	/**
	  * isActive
	  *
	  * This helper checks if current page is active.
	  *
	  * @return boolean
	  */
	isActive: function() {
		let settings = Template.instance().settings;
		return Session.get(settings.sessionName) ? this.valueOf() == Session.get(settings.sessionName) : false;
	}
});

Template.pagination.events({
	/**
	  * pagination-item click event
	  *
	  * This event fires when user clicked to pagination item.
	  *
	  * @return void
	  */
	'click .pagination-item': function(e) {
		let settings = Template.instance().settings;
		let pageNumber = parseInt(e.target.dataset.page);
		let clickEvent = settings.callback;

		$(".pagination-item").closest('li').removeClass('active');
		$(e.target).closest('li').addClass('active');

		!_.isNaN(pageNumber) ? Session.set(settings.sessionName, pageNumber) : console.log('Error! data-page is not a number!');
		
		_.isFunction(clickEvent) ? clickEvent() : console.log('Error! callback is not a function!') ;
	},
	/**
	  * pagination-next click event
	  *
	  * This event fires when user clicked to pagination next button.
	  *
	  * @return void
	  */
	'click .pagination-next': function(e) {
		let settings = Template.instance().settings;
		let currentPage = Session.get(settings.sessionName);

		if(currentPage > 0 && currentPage < Math.ceil(settings.totalCount / settings.perPage)) 
			Session.set(settings.sessionName, ++currentPage);
	},	
	/**
	  * pagination-prev click event
	  *
	  * This event fires when user clicked to pagination prev button.
	  *
	  * @return void
	  */
	'click .pagination-prev': function(e) {
		let settings = Template.instance().settings;
		let currentPage = Session.get(settings.sessionName);
		
		if(currentPage > 1)
			Session.set(settings.sessionName, --currentPage);
	}
});