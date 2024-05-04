import React from "react";
import { Row, Col, Card, Button, CardColumns, Form } from "react-bootstrap";
import { navigate_to_search } from "./store/modules/search";
import { update_search_term } from "./store/modules/search";
import { update_suggestions } from "./store/modules/suggestions";
import { open_modal } from "./store/modules/search";
import { close_modal } from "./store/modules/search";
import { toggle } from "./store/modules/help";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Results from "./Results.js";
import Filter from "./Filter.js";
import Help from "./Help.js";
import Datetime from "react-datetime";
import HomepageKeywords from "./homepage_keywords.json";
import ChartData from "./ChartData.json";
import Chart from "./Chart";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { suggestion as suggestionEnabled } from "./features.json";
require("moment/locale/hu");

const parseDate = (string) => (string ? string : string);

const formatDateValue = (value) => {
  try {
    return value.format("YYYY.MM.DD.");
  } catch (e) {
    return value;
  }
};

const Home = (props) => {
  return (
    <>
      <Row>
        <Col sm={props.search.term ? 3 : 12}>
          <h2>Kereső</h2>
          <form
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                props.navigate_to_search({
                  ...props.search,
                  term: props.search.search_term,
                });
              }
            }}
            onSubmit={(event) => {
              props.navigate_to_search({
                ...props.search,
                term: props.search.search_term,
              });
              event.preventDefault();
            }}
          >
            {suggestionEnabled ? (
              <AsyncTypeahead
                options={props.suggestions.suggestions}
                onSearch={(term) => {
                  props.update_search_term(term);
                  props.update_suggestions(term);
                }}
                onChange={(term) => {
                  props.navigate_to_search({
                    ...props.search,
                    term: term,
                  });
                }}
                labelKey="login"
                placeholder="Kezdjen el gépelni"
                searchText="Betöltés..."
                submitFormOnEnter={true}
                isLoading={props.suggestions.isLoading}
                renderMenuItemChildren={(option) => (
                  <div key={option}>{option}</div>
                )}
              />
            ) : (
              <Form>
                <Form.Control
                  value={props.search.search_term}
                  onChange={(event) => {
                    props.update_search_term(event.target.value);
                  }}
                  type="text"
                  placeholder="Kezdjen el gépelni"
                />
              </Form>
            )}
          </form>
          <CardColumns
            style={{ marginTop: "3em", display: "flex", flexWrap: "wrap" }}
          >
            {!props.search.term &&
              HomepageKeywords.map((keyword) => (
                <a
                  key={keyword}
                  className="hiddenLink"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    props.navigate_to_search({
                      term: keyword,
                    });
                  }}
                >
                  <Card>
                    <Card.Header>{keyword}</Card.Header>
                    <Card.Body>
                      <Chart
                        {...ChartData[keyword]}
                        width={300}
                        height={120}
                        mini
                      />
                      <Button
                        variant="primary"
                        onClick={() =>
                          props.navigate_to_search({
                            term: keyword,
                          })
                        }
                      >
                        Keresés
                      </Button>
                    </Card.Body>
                  </Card>
                </a>
              ))}
          </CardColumns>
          {props.search.term && props.search.term.length >= 3 ? (
            <div className="filterTools">
              <h2>Felszólalók</h2>
              <Filter
                counts={props.search.results.aggregations.speakers.buckets}
                field_name="speaker"
                onChange={(speaker) =>
                  props.navigate_to_search({
                    ...props.search,
                    speaker_filter: speaker.speaker,
                  })
                }
                filter_value={props.search.speaker_filter}
              />
              <h2>Felszólalás oka</h2>
              <Filter
                counts={props.search.results.aggregations.types.buckets}
                field_name="type"
                onChange={(type) =>
                  props.navigate_to_search({
                    ...props.search,
                    type_filter: type.type,
                  })
                }
                filter_value={props.search.type_filter}
              />
              <h2>Dátum</h2>
              <h3>Ettől a naptól:</h3>
              <Datetime
                timeFormat={false}
                value={parseDate(props.search.start_date)}
                onChange={(value) =>
                  props.navigate_to_search({
                    ...props.search,
                    start_date: formatDateValue(value),
                  })
                }
                locale="hu"
                input={true}
                closeOnSelect={true}
              />
              <h3>Eddig a napig:</h3>
              <Datetime
                timeFormat={false}
                value={parseDate(props.search.end_date)}
                onChange={(value) =>
                  props.navigate_to_search({
                    ...props.search,
                    end_date: formatDateValue(value),
                  })
                }
                locale="hu"
                input={true}
                closeOnSelect={true}
              />
            </div>
          ) : null}
        </Col>
        <Col sm={props.search.term ? 9 : 0}>
          <Help toggle={props.toggle} show={props.help.show} />
          <Results
            results={props.search.results}
            page={props.search.page}
            hitOpen={props.search.hitOpen}
            navigate_to_page={(n) => props.navigate_to_search(props.search, n)}
            open_modal={props.open_modal}
            close_modal={props.close_modal}
            term={props.search.term}
            isLoading={props.search.loading}
            filterType={props.search.type_filter}
            search={props.search}
          />
        </Col>
      </Row>
    </>
  );
};

const mapStateToProps = (state) => ({
  search: state.search,
  suggestions: state.suggestions,
  help: state.help,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      navigate_to_search,
      open_modal,
      close_modal,
      toggle,
      update_suggestions,
      update_search_term,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Home);
