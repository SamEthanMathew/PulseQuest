/**
 * PulseQuest No-Network Guard
 * Enforces offline-only operation for Axon by AppLovin compliance
 * Blocks all network requests: fetch, XMLHttpRequest, WebSocket
 */

(function() {
  const error = new Error('AXON VIOLATION: Network requests are forbidden');
  
  // Block fetch
  window.fetch = function() {
    throw error;
  };
  
  // Block XMLHttpRequest
  const XHRProto = XMLHttpRequest.prototype;
  XHRProto.open = function() {
    throw error;
  };
  XHRProto.send = function() {
    throw error;
  };
  
  // Block WebSocket
  window.WebSocket = function() {
    throw error;
  };
  
  console.log('[PulseQuest] Network guard active - offline mode enforced');
})();
