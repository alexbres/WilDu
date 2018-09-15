/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["css/app.css","66b75b6ad1526f0feba4e0fddfd1cd2d"],["fonts/Framework7Icons-Regular.eot","c0087d4d5ddd32ec52f1859b42956db6"],["fonts/Framework7Icons-Regular.ttf","4348368ab857cb57b18e1a87ba8ff284"],["fonts/Framework7Icons-Regular.woff","2e9a0313ed02aed1e206340feb36ec5c"],["fonts/Framework7Icons-Regular.woff2","ae8767ca8ecf4b090af58eff5dd6d3a7"],["fonts/MaterialIcons-Regular.eot","e79bfd88537def476913f3ed52f4f4b3"],["fonts/MaterialIcons-Regular.ttf","a37b0c01c0baf1888ca812cc0508f6e2"],["fonts/MaterialIcons-Regular.woff","012cf6a10129e2275d79d6adac7f3b02"],["fonts/MaterialIcons-Regular.woff2","570eb83859dc23dd0eec423a49e147fe"],["images/icons/icon-128x128.png","b1b0f7b8adb5bb5568c370b1c8af29e9"],["images/icons/icon-144x144.png","928538579a59f24888281462ce75ef7a"],["images/icons/icon-152x152.png","300cd90366750e4abbab2205d219624e"],["images/icons/icon-192x192.png","ac65b2a8d6e7ad80fdab29f76edd91c7"],["images/icons/icon-256x256.png","827577d4371bd0c83789fac7a2fe1546"],["images/icons/icon-32x32.png","940d8b2f15cc3bee9e6997f9408bbea7"],["index.html","10e00f60a6538c2435e7d968acdcffd1"],["js/app.js","d0c583de06a66074ec1823be04db4bcc"],["js/config.js","7c4b6a0448ed03b24dc5070d3bb86080"],["js/database.js","28fb8f8031ad6d7e70468726e8670f51"],["js/model/history.js","62e7b25e26ae5877142ae7baf02c2c3f"],["js/model/workItem.js","e5086422e021e5feb17fc21d1fb545fd"],["js/routes.js","6ee5fd96556ff37968ca48a8373013ab"],["libs/framework7-icons/css/framework7-icons.css","d447b786918f2e9e42353d83fb3580cc"],["libs/framework7-icons/fonts/Framework7Icons-Regular.eot","c0087d4d5ddd32ec52f1859b42956db6"],["libs/framework7-icons/fonts/Framework7Icons-Regular.ttf","4348368ab857cb57b18e1a87ba8ff284"],["libs/framework7-icons/fonts/Framework7Icons-Regular.woff","2e9a0313ed02aed1e206340feb36ec5c"],["libs/framework7-icons/fonts/Framework7Icons-Regular.woff2","ae8767ca8ecf4b090af58eff5dd6d3a7"],["libs/framework7/css/framework7.css","c14b92d61cd810e6bc86120dddbf928b"],["libs/framework7/css/framework7.ios.css","f54312a040eabe8d6a677f8c6df3c957"],["libs/framework7/css/framework7.ios.min.css","4a382cbb332006b5918df94e6da664e1"],["libs/framework7/css/framework7.md.css","0a96e17cd5df9ae519ddd795c803fdef"],["libs/framework7/css/framework7.md.min.css","701c4ecf43cd6a518ac3b1da4d0978b6"],["libs/framework7/css/framework7.min.css","d03eef664485749c41c3e98da4933628"],["libs/framework7/css/framework7.rtl.css","31117ba89f33e8838fd3c67acb7cb37a"],["libs/framework7/css/framework7.rtl.ios.css","88a295cd1f2feda7fe60d91dfed07bf1"],["libs/framework7/css/framework7.rtl.ios.min.css","3178fb16ffe641982c06de493a2d3621"],["libs/framework7/css/framework7.rtl.md.css","a6af0f3c49ce9691985fc3313f748f2c"],["libs/framework7/css/framework7.rtl.md.min.css","0077cd3891eb4ea6c2a74dfc2395635a"],["libs/framework7/css/framework7.rtl.min.css","532322081a4c6b7f98a15792b656bbd8"],["libs/framework7/js/framework7.js","f5d49d312b31641e0a0c80df6d15ea89"],["libs/framework7/js/framework7.min.js","8e901eee2b7ed0b51cb45ad3c0507586"],["libs/framework7/js/framework7.min.js.map","aadd3038554998243aaa3930553ce8e8"],["libs/requirejs/require.js","e7199843dfd445bb66ec816e98a03214"],["libs/vue/README.md","a64ac1319064e7e88d336ce95f667d52"],["libs/vue/vue.common.js","e6d37536e884179dec0d19d4a506afdd"],["libs/vue/vue.esm.browser.js","521178f1353f8f01409917b2f641c423"],["libs/vue/vue.esm.js","814c923657c2c266762821a0b8f969cd"],["libs/vue/vue.js","cbe2b9b2fb6955decf033515d079e44b"],["libs/vue/vue.min.js","5283b86cbf48a538ee3cbebac633ccd4"],["libs/vue/vue.runtime.common.js","39b84e7a63f4d13b42f1c3e7f0159937"],["libs/vue/vue.runtime.esm.js","89eb1f359386ff13a3d4c6015c9da7a8"],["libs/vue/vue.runtime.js","866639246a2aa15f06ecd699fccc31cb"],["libs/vue/vue.runtime.min.js","6c146377a7d621ca20fe789d805db6dc"],["manifest.json","4263404e592976aba750d463327385ab"],["pages/about.html","ff76391ad2cca28479d013e95434e81a"],["pages/worksetEdit.html","21d16c46188d4e65704b6a948bfd44ee"]];
var cacheName = 'sw-precache-v3-sw-precache-' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







