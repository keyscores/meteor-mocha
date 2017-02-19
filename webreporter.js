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
    console.log("MochaTestLogs", JSON.stringify(MochaTestLogs.find({event:'end'}).count()))
    return 'blue'
  }
});
