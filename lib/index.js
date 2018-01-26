'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _materialUi = require('material-ui');

var _place = require('material-ui/svg-icons/maps/place');

var _place2 = _interopRequireDefault(_place);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GooglePlaceAutocomplete = function (_Component) {
  _inherits(GooglePlaceAutocomplete, _Component);

  function GooglePlaceAutocomplete(props) {
    _classCallCheck(this, GooglePlaceAutocomplete);

    var _this = _possibleConstructorReturn(this, (GooglePlaceAutocomplete.__proto__ || Object.getPrototypeOf(GooglePlaceAutocomplete)).call(this, props));

    _this.state = {
      data: [],
      searchText: ''
    };

    var google = window.google;
    _this.geocoder = new google.maps.Geocoder();

    // Documentation for AutocompleteService
    // https://developers.google.com/maps/documentation/javascript/places-autocomplete#place_autocomplete_service
    _this.service = new google.maps.places.AutocompleteService(null);

    // binding for functions
    _this.updateInput = _this.updateInput.bind(_this);
    _this.populateData = _this.populateData.bind(_this);
    _this.getCurrentDataState = _this.getCurrentDataState.bind(_this);
    _this.getLatLgn = _this.getLatLgn.bind(_this);
    return _this;
  }

  _createClass(GooglePlaceAutocomplete, [{
    key: 'getCurrentDataState',
    value: function getCurrentDataState() {
      return this.state.data;
    }
  }, {
    key: 'getLatLgn',
    value: function getLatLgn(locationID, cb) {
      this.geocoder.geocode({ placeId: locationID }, function (results, status) {
        cb(results, status);
      });
    }
  }, {
    key: 'updateInput',
    value: function updateInput(searchText) {
      var _this2 = this;

      if (searchText.length > 0) {
        this.setState({
          searchText: searchText
        }, function () {
          var outerScope = _this2;
          _this2.service.getPlacePredictions({
            input: _this2.state.searchText,
            componentRestrictions: _this2.props.componentRestrictions,
            types: _this2.props.types
          }, function (predictions) {
            if (predictions) {
              outerScope.populateData(predictions);
            }
          });
        });
      } else if (searchText.length === 0) {
        this.setState({ searchText: searchText });
      }
    }
  }, {
    key: 'populateData',
    value: function populateData(array) {
      this.setState({ data: array });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_materialUi.AutoComplete, {
          anchorOrigin: this.props.anchorOrigin,
          animated: this.props.animated || true,
          animation: this.props.animation,
          errorStyle: this.props.errorStyle,
          errorText: this.props.errorText,
          floatingLabelText: this.props.floatingLabelText,
          fullWidth: this.props.fullWidth || true,
          hintText: this.props.hintText || ' ',
          listStyle: this.props.listStyle,
          maxSearchResults: this.props.maxSearchResults,
          menuCloseDelay: this.props.menuCloseDelay,
          menuStyle: this.props.menuStyle,
          onClose: this.props.onClose,
          open: this.props.open || false,
          style: this.props.style,
          targetOrigin: this.props.targetOrigin,
          textFieldStyle: this.props.textFieldStyle
          // Used by Google Places API / No user input
          , searchText: this.state.searchText,
          onUpdateInput: this.updateInput,
          onChange: this.updateInput,
          filter: _materialUi.AutoComplete.noFilter,
          onNewRequest: function onNewRequest(chosenRequest, index) {
            var dataItem = _this3.state.data[index];
            // indexing bug
            if (!dataItem) {
              dataItem = _this3.state.data[0];
            }
            _this3.getLatLgn(dataItem.place_id, function (results) {
              _this3.props.results(results[0].geometry.location.lat(), results[0].geometry.location.lng());
            });
          },
          dataSource: this.state.data.map(function (item, i, a) {
            // if (i === a.length - 1) {
            //   return {
            //     text: '',
            //     value: (
            //       <MenuItem
            //         style={{ cursor: 'default' }}
            //         disabled
            //         children={
            //           <div style={{ paddingTop: 20 }}>
            //             <img
            //               style={{ float: 'right' }}
            //               width={96}
            //               height={12}
            //               src="https://developers.google.com/places/documentation/images/powered-by-google-on-white.png"
            //               alt="presentation"
            //             />
            //           </div>
            //         }
            //       />
            //     ) };
            // }
            return {
              text: item.description,
              value: _react2.default.createElement(_materialUi.MenuItem, {
                style: _this3.props.menuItemStyle || {
                  fontSize: 13,
                  display: 'block',
                  paddingRight: 20,
                  overflow: 'hidden'
                },
                innerDivStyle: _this3.props.innerDivStyle || {
                  paddingRight: 38,
                  paddingLeft: 38
                }
                // Used by Google Places / No user input
                , primaryText: item.description,
                leftIcon: _react2.default.createElement(_place2.default, { style: { width: '20px' } })
              })
            };
          })
        })
      );
    }
  }]);

  return GooglePlaceAutocomplete;
}(_react.Component);

GooglePlaceAutocomplete.propTypes = {
  // Google componentRestrictions
  componentRestrictions: _propTypes2.default.object,
  types: _propTypes2.default.array,
  // AutoComplete properties
  anchorOrigin: _propTypes2.default.object,
  animated: _propTypes2.default.bool,
  animation: _propTypes2.default.func,
  errorStyle: _propTypes2.default.object,
  errorText: _propTypes2.default.any,
  floatingLabelText: _propTypes2.default.string,
  fullWidth: _propTypes2.default.bool,
  hintText: _propTypes2.default.string,
  listStyle: _propTypes2.default.object,
  maxSearchResults: _propTypes2.default.number,
  menuCloseDelay: _propTypes2.default.number,
  menuProps: _propTypes2.default.object,
  menuStyle: _propTypes2.default.object,
  onClose: _propTypes2.default.func,
  onNewRequest: _propTypes2.default.func,
  onUpdateInput: _propTypes2.default.func,
  open: _propTypes2.default.bool,
  openOnFocus: _propTypes2.default.bool,
  popoverProps: _propTypes2.default.object,
  searchText: _propTypes2.default.string,
  style: _propTypes2.default.object,
  targetOrigin: _propTypes2.default.object,
  textFieldStyle: _propTypes2.default.object,
  // Prop types for dataSource
  innerDivStyle: _propTypes2.default.object,
  menuItemStyle: _propTypes2.default.object,
  results: _propTypes2.default.func
};

exports.default = GooglePlaceAutocomplete;