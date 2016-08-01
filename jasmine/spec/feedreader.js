/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have a non-empty url defined', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);

            });
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have a non-empty named defined', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);

            });

        });
    });


    /* A test suite for "The menu" */

    describe('The menu', function () {


        /* Make sure the menu is hidden by default.
         * body has a class menu-hidden which hides the menu
         * check that this class is applied to body
         */

        it('is hidden by default', function () {
            expect($('body').hasClass('menu-hidden')).toBe(true);

        });


         /* A test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
         it('changes visibility when the menu icon is clicked', function () {
             var menuIcon = $('.menu-icon-link');

             // when menu icon is clicked body should not have class menu-hidden
             menuIcon.click();
             expect($('body').hasClass('menu-hidden')).toBe(false);

             // when menu icon is clicked again body should have class menu-hidden
             menuIcon.click();
             expect($('body').hasClass('menu-hidden')).toBe(true);

         });

    });

    /* A new test for "Initial Entries" */

    describe('Initial Entries', function () {


        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        // run the load feed function before the actual tests
        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });
        });

        // article has class entry, ensure that it has at least one entry
        it('has at least a single entry element within the feed container', function () {
            expect($('.entry').length).toBeGreaterThan(0);
        });
    });

    /* A test suite for "New Feed Selection"
     */

    describe('New Feed Selection', function () {


        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        // get content for initial feed and for the second feed when it is changed
        var initialFeed;

        beforeEach(function (done) {
            loadFeed(0, function () {
                initialFeed = $('.feed').html();
                loadFeed(1, function () {
                    done();
                });
            });

        });

        it('changes content when a new feed is loaded', function () {
            // expect both feeds to be defined and to be different
            expect(initialFeed).toBeDefined();

            var secondFeed = $('.feed').html();
            expect(secondFeed).toBeDefined();

            expect(initialFeed).not.toEqual(secondFeed);

        });

        // populate feed with initial content after the test
        afterEach(function () {
            loadFeed(0);
        });

    });
}());
