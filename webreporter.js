import './lib/collections';


import { Template } from 'meteor/templating'
if(Meteor.isClient){
  Meteor.startup(function(){
    // $( "body" ).append( "<div><p>Test</p></div>" );
    // Blaze.render('hello', $( "body" )[0])
    Blaze.render(Template.reporter, $( "body" )[0])

  });
}

Template.reporter = Template.fromString(`
  <p>Reporter</p>
  <div style="width: 50px; height: 50px; -webkit-border-radius: 25px; -moz-border-radius: 25px; border-radius: 25px; background: {{color}};"></div>
`);

Template.reporter.helpers({
  color: function(){
    var summary = MochaTestLogs.findOne({event:'summary'})

    console.log("MochaTestLogs summary", JSON.stringify(MochaTestLogs.find({event:'summary'}).count()))
    console.log("MochaTestLogs end", JSON.stringify(MochaTestLogs.find({event:'end'}).count()))

    if ( summary && summary.data.fail > 0 ){
      return 'red'
    }
    if ( summary && summary.data.fail === 0 ){
      return 'green'
    }
    return 'blue'
  }
});
