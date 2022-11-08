import { useState, useMemo, useEffect, useRef, Fragment } from "react";
import PresentationsTable from "components/PresentationsTable";
import Button from "components/UIKit/Button";
import ButtonGroup from "components/UIKit/ButtonGroup";
import { Presentation } from "types/models";
import Loader from "components/UIKit/Loader";
import { api } from "lib/api";
import useUser from "hooks/useUser";
import useGetPresentationSlotsQuery from "hooks/useGetPresentationSlotsQuery";
import { Transition } from "@headlessui/react";

const PresentationsPage = () => {
  const [currentSlot, setcurrentSlot] = useState(0);
  const [errorShown, setErrorShown] = useState(false);
  const errorShownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { data: slots } = useGetPresentationSlotsQuery();
  const {
    data: selectedPresentations,
    isFetching: isMyPresentationsFetching,
    refetch: refetchSelected,
  } = api.useGetUsersPresentationsQuery();
  const {
    data: presentations,
    isLoading: isEventsLoading,
    isFetching: isEventsFetching,
    refetch: refetchEvents,
  } = api.useGetEventsQuery((slots && slots[currentSlot]?.id) ?? -1, {
    pollingInterval: 10000,
  });
  const [signUp, { isLoading: signupInProgress, error: signupError }] =
    api.useSignUpMutation();
  const [
    cancelSignup,
    { isLoading: cancelSignupInProgress, error: cancelSignupError },
  ] = api.useCancelSignUpMutation();

  const { user } = useUser();
  const signUpAction = async (presentation: Presentation) => {
    if (signupInProgress) {
      return;
    }
    try {
      if (!user || !user.e5code) {
        alert("Please enter your code first");
        return;
      }
      const attendance = await signUp({
        attender: user.id,
        event: presentation,
      }).unwrap();
      refetchSelected();
      refetchEvents();
    } catch (err) {}
  };

  const cancelSignupAction = async (presentation: Presentation) => {
    if (cancelSignupInProgress) {
      return;
    }
    try {
      await cancelSignup({
        attender: user.e5code,
        event: presentation,
      }).unwrap();
      refetchSelected();
      refetchEvents();
    } catch (err) {
      alert("Jelentkezés törlése sikertelen");
    }
  };

  const selectedPresentation = useMemo(
    () =>
      slots &&
      selectedPresentations?.find(
        (presentation) => presentation.slot_id === slots[currentSlot].id
      ),
    [currentSlot, selectedPresentations, slots]
  );

  const errormsg = useMemo(() => {
    if (signupError && "status" in signupError) {
      const message = (signupError.data as any).message;
      if (!message && message === "") return "Ismeretlen hiba";
      else return message;
    }
  }, [signupError]);

  useEffect(() => {
    if (errormsg !== undefined) {
      setErrorShown(true);
      if (errorShownTimeout.current) clearTimeout(errorShownTimeout.current);
      errorShownTimeout.current = setTimeout(() => {
        setErrorShown(false);
      }, 3000);
    }
  }, [errormsg]);

  if (!slots || !selectedPresentations || !presentations) return <Loader />;

  const SelectField = () => {
    return (
      <div className="md:mx-3 flex-1 text-center flex flex-col md:flex-row justify-center items-stretch gap-4 md:gap-8">
        <div className="flex-1">
          <h3>Általad Választott előadás</h3>
          <div className="rounded-lg bg-green-600 p-3 ">
            {selectedPresentation?.name ?? "Még nem választottál előadást"}
          </div>
        </div>
        <Button
          variant="danger"
          onClick={() => {
            if (selectedPresentation) cancelSignupAction(selectedPresentation);
          }}
          disabled={!selectedPresentation || cancelSignupInProgress}
        >
          Törlés
        </Button>
      </div>
    );
  };

  const ErrorMsgBox = () => {
    return (
      <div
        className={`rounded-lg bg-red max-w-6xl mx-auto my-4 py-3 text-center transition ease-in-out delay-100 duration-500 ${
          !errorShown && "hidden"
        }`}
      >
        <h4 className="text-xl font-semibold">Hiba</h4>
        <hr className="bg-white mx-3 shadow-md shadow-white" />
        <p>{errormsg}</p>
      </div>
    );
  };

  return (
    <div className="mx-5">
      <div className="container mx-auto">
        <h1 className="text-center font-bold text-4xl max-w-f pb-4">
          E5N - Előadásjelentkezés
        </h1>
        <ErrorMsgBox />
        <div className="md:flex flex-row items-stretch mb-4  justify-between ">
          <ButtonGroup>
            {slots.map((slot, index) => (
              <Button
                variant="secondary"
                key={index}
                disabled={index === currentSlot}
                onClick={() => setcurrentSlot(index)}
              >
                {slot.name}
              </Button>
            ))}
          </ButtonGroup>
          <SelectField />
        </div>
        <PresentationsTable
          presentations={(presentations as Presentation[]) ?? []}
          callback={selectedPresentation ? undefined : signUpAction}
          disabled={
            signupInProgress || isMyPresentationsFetching || isEventsFetching
          }
          isLoading={isEventsLoading}
        />
      </div>
    </div>
  );
};
export default PresentationsPage;
