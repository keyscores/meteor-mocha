import './lib/collections';
import { Template } from 'meteor/templating'
import { Session } from 'meteor/session'

if(Meteor.isClient){
  Meteor.startup(function(){
    Session.set("filterState", 'all')


    // TODO: should run again when page refreshes,
    // generating TypeError: Cannot read property 'call' of undefined
    // Meteor.call("runAllTests", function(err,res){
    //   console.log('err', err);
    //   console.log('res', res);
    // })

    Blaze.render(Template.wrapper, $( "body" )[0])
  });
}

Template.eachTest = Template.fromString(`
  <div>
      <p class="uk-text-left eachTitle" data-title="{{this.data.title}}">
        <span style="{{#if icon this.data.state }} color: #84BF99 {{else}} color: #F37996 {{/if}}"> {{#if icon this.data.state }} &bull; {{else}} &#10005; {{/if}} </span> {{ this.data.title }}
      </p>
  </div>
`)

Template.eachTest.helpers({
  stringify: function(obj){
    return JSON.stringify( obj )
  },
  icon: function( state ){
    if (state === 'passed'){
      return true
    } else {
      return false
    }
  }
});

Template.eachTest.events({
  "click .eachTitle": function(event, template){
    const target = event.currentTarget
    var keyword = $( target ).data( "title" )
    Session.set('grepString', keyword)
    console.log('keyword', keyword);
    console.log('grepString', Session.get('grepString') )
  }
});

Template.runner = Template.fromString(`
  <h4> {{caps this.env}} </h4>
  {{#each listSuites this.env}}
    <span class="eachTitle"> {{this.data.title}} </span>
    {{#each listTests ../env this.data.title }}
      {{>eachTest this }}
    {{/each}}
  {{/each}}
`)

Template.runner.helpers({
  listTests: function(env, parentTitle){
    var query
    if ( Session.get('filterState') !== 'all' ){
      query =  Session.get('filterState')
    }else{
      query = { $exists: true}
    }
    return MochaTestLogs.find({ environment: env , event:'test end', 'data.state': query, 'data.parent.title': parentTitle }).fetch()
  },
  listSuites: function(env){
    return MochaTestLogs.find({ environment: env , event:'suite'}).fetch()
  },
  caps : function (string) {
     return string.charAt(0).toUpperCase() + string.slice(1);
  }
});


Template.report = Template.fromString(`
  <div class="uk-modal-dialog">
      <div class="uk-modal-header">
        <div class="uk-align-center uk-grid">
          <div>
            <form class="uk-grid-small" uk-grid>
              <div class="uk-width-1-3@s">
                <div class="uk-button-group">
                  <button class="uk-button {{#if toggleButton 'passed'}}  uk-button-primary {{else}} uk-button-default {{/if}}  btn-test-state" data-state="passed">Passing</button>
                  <button class="uk-button {{#if toggleButton 'all'}}  uk-button-primary {{else}} uk-button-default {{/if}}  btn-test-state" data-state="all">All</button>
                  <button class="uk-button {{#if toggleButton 'failed'}}  uk-button-primary {{else}} uk-button-default {{/if}}  btn-test-state" data-state="failed">Failing</button>
                </div>
              </div>
              <div class="uk-width-1-2@s">
                  <input class="uk-input" type="text" value="{{grepString}}" placeholder="Grep">
              </div>
              <div class="uk-width-1-6@s">
                <label><input class="uk-checkbox" type="checkbox"> invert </label>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="uk-modal-body" uk-overflow-auto>
      <div class="uk-grid-collapse uk-child-width-expand@s uk-text-center" uk-grid>
          <div>
              <div class="uk-margin">
                {{>runner env='client'}}
              </div>
          </div>
          <div>
              <div class="uk-margin">
                {{>runner env='server'}}

              </div>
          </div>
        </div>
      </div>
  </div>
`);

Template.wrapper = Template.fromString(`
  <div style="position: fixed; bottom: 0; left: 0; padding:10px" uk-toggle="target: #full-report-modal" >
    <div style="width: 50px;
    height: 50px;
    -webkit-border-radius: 25px;
    -moz-border-radius: 25px;
    border-radius: 25px;
    background: {{color}};"></div>

    <div id="full-report-modal" class="uk-modal-container" uk-modal>
      {{>report}}
    </div>
  </div>
`);

//
Template.wrapper.rendered = function(){
  UIkit.modal('#full-report-modal', {});
}

Template.wrapper.helpers({
  color: function(){
    var summary = MochaTestLogs.findOne({event:'summary'})
    console.log('summary', summary);

    console.log("MochaTestLogs summary", JSON.stringify(MochaTestLogs.find({event:'summary'}).count()))
    console.log("MochaTestLogs end", JSON.stringify(MochaTestLogs.find({event:'end'}).count()))

    if ( summary && summary.fail > 0 ){
      return '#F37996' //red
    }
    if ( summary && summary.fail === 0 ){
      return '#84BF99' //green
    }
    return '#4BC7EA' //blue
  }
});

Template.report.helpers({
  listTests: function(env, parentTitle){
    var query
    if ( Session.get('filterState') !== 'all' ){
      query =  Session.get('filterState')
    }else{
      query = { $exists: true}
    }
    return MochaTestLogs.find({ environment: env , event:'test end', 'data.state': query, 'data.parent.title': parentTitle }).fetch()
  },
  listSuites: function(env){
    return MochaTestLogs.find({ environment: env , event:'suite'}).fetch()
  },
  grepString: function(obj){
    return Session.get('grepString')
  },
  toggleButton: function(type){
    if (type === Session.get('filterState') ){
      return true
    }
    return false
  },
  stringify: function(obj){
    return JSON.stringify( obj )
  },

});


Template.report.events({
  "click .btn-test-state": function(event, template){
    event.preventDefault()
    const target = event.currentTarget
    var state = $( target ).data( "state" )
    Session.set("filterState", state)
  }
});
